import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({});

export const dynamo = {
  write: async (data: Record<string, any>, tableName: string) => {
    const params: PutCommandInput = {
      TableName: tableName,
      Item: data,
    };
    const command = new PutCommand(params);

    await dynamoClient.send(command);

    return data;
  },
  get: async <T = Record<string, any>>(id: string, tableName: string) => {
    const params: GetCommandInput = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    const command = new GetCommand(params);

    const response = await dynamoClient.send(command);

    return response.Item as T;
  },
  query: async <T = Record<string, any>>({
    tableName,
    index,
    pkValue,
    pkKey = "pk",
    skValue,
    skKey = "sk",
    limit,
  }: {
    tableName: string;
    index: string;
    pkValue: string;
    pkKey?: string;
    skValue?: string;
    skKey?: string;
    sortAscending?: boolean;
    limit?: number;
  }) => {
    const skExpression = skValue ? ` AND ${skKey} = :rangeValue` : "";

    const params: QueryCommandInput = {
      TableName: tableName,
      IndexName: index,
      KeyConditionExpression: `${pkKey} = :hashValue${skExpression}`,
      ExpressionAttributeValues: {
        ":hashValue": pkValue,
      },
      Limit: limit,
    };

    if (skValue) {
      params.ExpressionAttributeValues[":rangeValue"] = skValue;
    }
    const command = new QueryCommand(params);

    const response = await dynamoClient.send(command);

    return response.Items as T[];
  },
};
