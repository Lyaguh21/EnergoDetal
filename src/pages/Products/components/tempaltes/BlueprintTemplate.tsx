import { Box } from "@mantine/core";
import classes from "../../classes/BlueprintTemplate.module.css";
import { NavLink } from "react-router";

export default function BlueprintTemplate({ name }: { name: string }) {
  return (
    <NavLink className={classes.BlueprintTemplate} to={`/products/${name}`}>
      {name}
    </NavLink>
  );
}
