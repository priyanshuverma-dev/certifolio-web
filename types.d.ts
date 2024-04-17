type Nft = {
  ok: boolean;
  value: {
    cid: string;
    size: number;
    created: Date;
    type: string;
    scope: string;
    name: string;
    pin: {
      cid: string;
      name: string;
      meta: {};
      status: string;
      created: Date;
      size: number;
    };
    files: [
      {
        name: string;
        type: string;
      }
    ];
    deals: [
      {
        batchRootCid: string;
        lastChange: Date;
        miner: string;
        network: string;
        pieceCid: string;
        status: string;
        statusText: string;
        chainDealID: number;
        dealActivation: Date;
        dealExpiration: Date;
      }
    ];
  };
};

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  message?: string;
};
