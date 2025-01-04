type Create = (input: any) => Promise<{}>;
type Find = (input: any) => Promise<{}>;
type Edit = (input: any) => Promise<{}>;
type Delete = (input: any) => Promise<{}>;

export type CartRepositoryType = {
  create: Create;
  find: Find;
  edit: Edit;
  delete: Delete;
};
