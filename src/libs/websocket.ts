import {
  ApiGatewayManagementApi,
  PostToConnectionCommand,
  PostToConnectionCommandInput,
} from "@aws-sdk/client-apigatewaymanagementapi";

export const websocket = {
  createClient: ({
    domainName,
    stage,
  }: {
    domainName: string;
    stage: string;
  }) => {
    const client = new ApiGatewayManagementApi({
      endpoint: `https://${domainName}/${stage}`,
    });
    console.log({message: "THE CLIENT", client})
    return client;
  },
  send: ({
    data,
    connectionId,
    domainName,
    stage,
    client,
  }: {
    data: Message;
    connectionId: string;
    domainName?: string;
    stage?: string;
    client?: ApiGatewayManagementApi;
  }) => {
    if (!client) {
      if (!domainName || !stage) {
        throw Error("domainName or stage required");
      }
      client = websocket.createClient({ domainName, stage });
    }
    const params: PostToConnectionCommandInput = {
      ConnectionId: connectionId,
      Data: JSON.stringify(data) as any,
    };

    console.log({ message: "PARAMS", params });

    const command = new PostToConnectionCommand(params);

    return client.send(command);
  },
};
