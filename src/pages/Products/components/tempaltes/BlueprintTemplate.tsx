import { Box } from "@mantine/core";
import classes from "../../classes/BlueprintTemplate.module.css";
import { NavLink } from "react-router";

export default function BlueprintTemplate({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <NavLink className={classes.BlueprintTemplate} to={`/products/${link}`}>
      {text}
    </NavLink>
  );
}
