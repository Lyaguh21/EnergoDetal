import { Box, Image, Text } from "@mantine/core";
import { Execution } from "../../../../entities/Execution.interface";
import { NavLink, useParams } from "react-router";
import { API } from "../../../../app/helpers";
import classes from "../../classes/ExecutionTemplate.module.css";

export default function ExecutionTemplate({ data }: { data: Execution }) {
  const { BlueprintId } = useParams();
  return (
    <NavLink
      to={`/products/${BlueprintId}/${data.name}`}
      className={classes.template}
    >
      <Image
        src={data.imageurl}
        w="100%"
        fit="contain"
        style={{ aspectRatio: 1 / 1, border: "1px solid #B5B7BB" }}
      />
      <Text py={20} fz={36} fw="bold" c="black">
        {data.name}
      </Text>
      <Text fz={20} c="#515661">
        {data.description}
      </Text>
    </NavLink>
  );
}
