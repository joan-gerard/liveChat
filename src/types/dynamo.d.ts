type UserConnectionRecord = {
  id: string;
  pk: string;
  sk: string;

  roomCode: string;
  name: string;
  domainName: string;
  stage: string;
};

type Message = {
  message?: string;
  from?: string;
  type?: string;
};
