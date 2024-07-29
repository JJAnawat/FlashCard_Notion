import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { databaseId, STATUS } from "~/const";
import { Client, isFullPage } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const wordRouter = createTRPCRouter({
  getAllWords: publicProcedure.query(async () => {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Status',
          direction: 'ascending',
        },
      ],
    });
    // console.log(response.results.filter(isFullPage)[0]?.properties.Status);
    const res = response.results
      .filter(isFullPage)
      .map((item: PageObjectResponse) => ({
        id: item.id,
        properties: {
          example: item.properties.Example?.type === 'rich_text' ? item.properties.Example.rich_text[0]?.plain_text ?? "" : "",
          meaning: item.properties.Meaning?.type === 'rich_text' ? item.properties.Meaning.rich_text[0]?.plain_text ?? "" : "",
          pos: item.properties.PoS?.type === 'select' ? item.properties.PoS.select?.name ?? "" : "",
          status: item.properties.Status?.type === 'status' ? item.properties.Status.status?.name ?? "" : "",
          word: item.properties.Word?.type === 'title' ? item.properties.Word.title[0]?.plain_text ?? "" : "",
        },
      }));

    return res;
  }),

  // changeStatus: publicProcedure
  //   .input(z.object({ pageId: z.string(), newStatus: z.number().gte(0).lt(STATUS.length) }))
  //   .mutation(async ({ input }) => {
  //     const response = await notion.pages.update({
  //       page_id: input.pageId,
  //       properties: {
  //         Status: {
  //           select: {
  //             name: STATUS[input.newStatus],
  //           },
  //         },
  //       },
  //     });
  //     console.log(response);
  //   }),
});
