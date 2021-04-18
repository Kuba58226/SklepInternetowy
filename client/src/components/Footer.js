import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
}));

export default function Footer() {
    const classes = useStyles();

    return (
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Sklep Internetowy
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Sklep Internetowy to jeden z największych i najpopularniejszych sklepów komputerowych w Polsce.
          W szerokiej ofercie sklepu można znaleźć wydajne podzespoły komputerowe renomowanych producentów. 
          Oferta sklepu umożliwia skonfigurowanie i zakup komputerów o optymalnej wydajności i atrakcyjnej cenie.
        </Typography>
        <Copyright />
      </footer>
    );
}