import { Image } from 'semantic-ui-react';
import { FunctionComponent, useState, useEffect } from 'react';
import Nouser from 'assets/nouser.jpeg'

interface ICAvatar {
    size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive',
    src?: string,
    rounded?: boolean,
}


const CustomAvatar: FunctionComponent<ICAvatar> = ({ size, src, rounded }) => {
    const [img, setImg] = useState<string|undefined>(Nouser);

    useEffect(() => {
        if (!src || src === '') {
            setImg(Nouser);
        }else{
            setImg(src);
        }
    }, [src])
    return (
        <Image src={img} rounded size={size} />
    )
}

export default CustomAvatar
