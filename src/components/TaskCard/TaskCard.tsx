import { Card, CardContent, Typography } from "@mui/material";
import { strings } from "./helpers";

const TaskCard = () => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1">{strings.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
