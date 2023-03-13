import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Reptile } from "../api/models";
import { readableSpecies } from "../utils/miscFunctions";

interface ReptileCardProps {
  reptile: Reptile;
}

export const ReptileCard: FC<ReptileCardProps> = (props) => {
  const { reptile } = props;

  const navigate = useNavigate();

  return (
    <Card
      sx={{ minWidth: "12rem", cursor: "pointer" }}
      onClick={() => {
        navigate(`/reptile/${reptile.id}`);
      }}
    >
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {readableSpecies(reptile.species)}
        </Typography>
        <Typography variant="h5" component="div">
          {reptile.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {reptile.sex === "male" ? "♂" : "♀"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReptileCard;
