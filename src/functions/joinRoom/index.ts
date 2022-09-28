import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";
import { websocket } from "@libs/websocket";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { name, roomCode } = JSON.parse(event.body);
    const tableName = process.env.roomConnectionTable;

    const { connectionId, domainName, stage } = event.requestContext;

    console.log({ connectionId, domainName, stage });

    if (!name) {
      await websocket.send({
        data: {
          message: "You need a name on joinRoom",
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }
    if (!roomCode) {
      await websocket.send({
        data: {
          message: "You need a roomCode on joinRoom",
          type: "err",
        },
        connectionId,
        domainName,
        stage,
      });
      return formatJSONResponse({});
    }

    console.log({ message: "I AM HERE" });
    const roomUsers = await dynamo.query({
      pkValue: roomCode,
      tableName,
      index: "index1",
      limit: 1
    });

    if (roomUsers.length === 0) {
        await websocket.send({
          data: {
            message: "No room with that code exists",
            type: "err",
          },
          connectionId,
          domainName,
          stage,
        });
        return formatJSONResponse({});
      }
  

    const data: UserConnectionRecord = {
      id: connectionId,
      pk: roomCode,
      sk: connectionId,

      roomCode,
      name,
      domainName,
      stage,
    };

    console.log({ message: "THE DATA", data });

    await dynamo.write(data, tableName);

    await websocket.send({
      data: {
        message: `You are now connected to room ${roomCode}`,
        type: "info",
      },
      connectionId,
      domainName,
      stage,
    });

    return formatJSONResponse({});
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
