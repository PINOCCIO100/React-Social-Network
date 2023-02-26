export function userProfileTransformer(p) {
  return {
    id: p.id,
    name: p.name,
    username: p.name,
    email: p.email,
    address: {
      street: p.address.street,
      city: p.address.city,
    },
    phone: p.phone,
    website: p.website,
    company: {
      name: p.website.name,
      catchPhrase: p.company.catchPhrase,
    }
  }
}