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

type Certificate = {
  id: string;
  cid: string;
  size: number;
  description: string;
  issuer: string;
  verifyUrl: string;
  pinned: boolean;
  category: string;
  title: string;
  createdAt: Date;
  user: User;
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
  totalCertificates?: number;
};
