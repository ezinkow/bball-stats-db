import React from 'react'
import {
    Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500,
    },
    color1: {
        backgroundColor: "purple"
    },
    color2: {
        backgroundColor: "yellow"
    },
    color3: {
        backgroundColor: "grey"
    }
});

export default function ApiResultsList({ apiResponse }) {
    const classes = useStyles();
    console.log('apilist', apiResponse)
    if (apiResponse.length > 0) {
        return (
            <Grid item xs={8}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader size="small" aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Team</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apiResponse.map((player) => (
                                    <TableRow key={player.id}>
                                        <TableCell component="th" scope="row">
                                            <Link to={`/bball-stats-db/results/${player.id}`}>
                                                {player.first_name} {player.last_name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {player.team.full_name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                {/* <input
                type="submit"
                value="Next Page"
                onClick={handleNextPage} /> */}
            </Grid>
        )
    }
    else {
        return (
            <>
            </>)
    }
}