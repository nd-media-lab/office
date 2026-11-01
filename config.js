// The dashboard's Supabase project. The publishable key is public by design: without signing in as the owner it
// reads nothing (row-level security), and only the mini PC's token can write.
const OFFICE = {
  url: 'https://debdzvucoiwqdrnecjxn.supabase.co',
  key: 'sb_publishable_TUdR77NvDnGHhC1W5W7B8Q_xoRxbBBM',
};
// The owner's email is deliberately not here: the sign-in link is sent by the `office-signin` Supabase function
// (supabase/functions/office-signin), which alone knows the address.
