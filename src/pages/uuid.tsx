import { Typography } from "@mui/material";
import { v4 as uuid } from 'uuid';

export default function UuidPage() {
  return (
    <>
      <Typography variant="h3" fontWeight="700">
        UUID Generator
      </Typography><br />
      <Typography variant="body1">
        A GUID (Globally Unique Identifier) or UUID (Universally Unique Identifier) is a 128-bit integer number used to uniquely identify resources. The term GUID is primarily used by developers working with Microsoft technologies, while UUID is more commonly used in other contexts.
      </Typography><br />
      <Typography variant="h4">
        {uuid()}
      </Typography>
    </>
  );
}
