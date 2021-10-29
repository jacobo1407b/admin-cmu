import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FunctionComponent } from 'react';
import { Grid } from 'semantic-ui-react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface ICProfile {
    image?: string,
    name: string,
    matriucla: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
    }),
);

const CardProfile: FunctionComponent<ICProfile> = ({ image, name, matriucla }) => {
    const classes = useStyles();
    return (
        <div>
            <Card>
                <br />
                <CardContent>
                    <Grid centered className="pointer-custom">
                        <Avatar src={image} className={classes.large} />
                    </Grid>
                    <br />
                    <br />
                    <div className="pointer-custom">
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {matriucla}
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardProfile;

