import dns from "dns";
import validator from "email-validator";

export const isValidEmailDeep = (email: string): Promise<boolean> => {
  if (!validator.validate(email)) {
    return Promise.resolve(false);
  }

  const domain = email.split("@")[1];

  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err || addresses.length === 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}