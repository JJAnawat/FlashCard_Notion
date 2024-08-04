import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { databaseId } from "~/const";
import { Client, isFullPage } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
          score: item.properties.Score?.type === 'number' ? item.properties.Score.number ?? 0 : 0,
        },
      }));

    return res;
  }),
  changeScore: publicProcedure
    .input(z.record( z.string(), z.number().gte(0).lte(10) ))
    .mutation(async ({ input }) => {
      const results = [];

      for (const [pageId, score] of Object.entries(input)) {
        const response = await notion.pages.update({
          page_id: pageId,
          properties: {
            Score: {
              number: score,
            },
          },
        });
        results.push(response);
        
        await sleep(100);
      }

      return { message: "Scores updated successfully", results };
    }),
});
