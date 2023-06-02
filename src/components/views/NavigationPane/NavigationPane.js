import React from "react"
import styles from "./NavigationPane.module.css"
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { Paper } from '@material-ui/core';


const NavigationPane = () => {

  return (
    <Paper>
    <Grid container direction={"row"} justifyContent="space-around" alignItems={"stretch"} id={styles['menu-items']}>
      <Grid item xs={2.4} className={styles["menu-item"]}>
        <Link to="/" name="/" className={styles["menu-item"]}>HOME</Link>
      </Grid>
      <Grid item xs={2.4} className={styles["menu-item"]}>
        <Link to="/create-user" name="/create-user" className={styles["menu-item"]}>CREATE USER</Link>
      </Grid>
      <Grid item xs={2.4} className={styles["menu-item"]}>
        <Link to="/create-loan" name="/create-loan" className={styles["menu-item"]}>CREATE LOAN</Link>
      </Grid>
      <Grid item xs={2.4} className={styles["menu-item"]}>
        <Link to="/share-loan" name="/share-loan" className={styles["menu-item"]}>SHARE LOANS</Link>
      </Grid>
      <Grid item xs={2.4} className={styles["menu-item"]}>
        <Link to="/get-all-loans" name="/get-all-loans" className={styles["menu-item"]}>VIEW LOANS</Link>
      </Grid>
    </Grid>
    </Paper>
  )
}

export default NavigationPane