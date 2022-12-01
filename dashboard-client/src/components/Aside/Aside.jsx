import React from "react";
import styles from "./Aside.module.scss";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BOXES_ROUTE, BOX_TYPES_ROUTE } from "../../routing/routes";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

export default function Aside() {
  return (
    <nav className={styles.asside}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href={BOXES_ROUTE}>
            <ListItemIcon>
              <DonutLargeIcon />
            </ListItemIcon>
            <ListItemText primary="Boxes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href={BOX_TYPES_ROUTE}>
            <ListItemIcon>
              <DonutLargeIcon />
            </ListItemIcon>
            <ListItemText primary="Box Types" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}
