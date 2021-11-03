import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { User, globalState } from 'types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FunctionComponent } from 'react';
import Loader from 'assets/loader.gif';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UpdateM from 'components/UpdateM';
import { useDispatch, useSelector } from 'react-redux';
import { addImage } from 'api';
import * as patch from 'redux/dispatch';

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

    const user: User = useSelector((state: globalState) => state.user);
    const role: string = useSelector((state: globalState) => state.role);

    const [urlImage, seturlImage] = useState<string | undefined>(image);
    const dispatch = useDispatch()
    const classes = useStyles();

    const onDrop = useCallback(acceptedFiles => {
        var formdata = new FormData();
        const file = acceptedFiles[0];
        seturlImage(Loader);
        formdata.append("image", file, file.name);
        addImage(formdata)
            .then(res => {
                if (res.error) {
                    alert(res.msg);
                    seturlImage(image)
                } else {
                    seturlImage(res.resolve.url);
                    var newuser = {
                        ...user,
                        url: res.resolve.url,
                        name_image: res.resolve.name_image
                    }
                    dispatch(patch.setUser(newuser))
                    alert(res.msg);
                }
            })
            .catch(err => {
                console.log(err)
                alert('Error del servidor');
                seturlImage(image)
            })
    }, [seturlImage, dispatch, image, user])


    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop,
    })

    function openEdit() {
        if (role === "Enfermero") {
            return false
        } else {
            dispatch(patch.setModal({
                open: true,
                title: "Actualizar Contraseña y Matricula",
                content: <UpdateM />
            }))
        }

    }
    return (
        <div>
            <Card>
                <br />
                <CardContent>
                    <div style={{
                        justifyContent: "center",
                        display: "flex"
                    }}>
                        <Avatar src={urlImage} {...getRootProps()} className={classes.large} />
                        <input {...getInputProps()} />
                    </div>

                    <br />
                    <br />
                    <div className="pointer-custom" onClick={openEdit}>
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

