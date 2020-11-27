import DatauriParser from "datauri/parser";
import path from "path";
const parser = new DatauriParser();

// dUri.format('.png', buffer);
const dataUri = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

export default dataUri;
