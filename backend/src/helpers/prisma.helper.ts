const getPrismaError = (err: any): string => {
  switch (err.code) {
    case 'P2002':
      return `Duplicate field value: ${err.meta.target}`;
    case 'P2014':
      return `Invalid ID: ${err.meta.target}`;
    case 'P2003':
      // handling invalid data errors
      return `Invalid input data: ${err.meta.target}`;
    default:
      return `Something went wrong: ${err.message}`;
  }
};

export { getPrismaError };
