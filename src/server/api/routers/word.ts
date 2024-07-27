import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { databaseId, STATUS } from "~/const";

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export const wordRouter = createTRPCRouter({
  getAllWords: publicProcedure.query(async ()=>{
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Status',
          direction: 'ascending',
        },
      ],
    });
    let res = response.results.map((item)=>({
      id: item.id,
      properties: item.properties, // It somehow showing an error and I don't know why either.
    }));
    console.log(res);
  }),
  changeStatus: publicProcedure.input(z.object({ pageId:z.string(), newStatus: z.number().gte(0).lt(STATUS.length) })).mutation(async ({ input })=>{
    const response = await notion.pages.update({
      page_id: input.pageId,
      properties: {
        'Status': {
          status: {
            name: STATUS[input.newStatus]
          }
        }
      },
    });
    console.log(response);
  }),
});
