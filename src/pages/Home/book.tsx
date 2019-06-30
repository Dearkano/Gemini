import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IBook } from '@gemini'
import { getUserByBookName } from '@/services/user'
import { buy } from '@/services/book'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import finishIcon from '@/assets/finish.png'

const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: {
      width: 500,
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        width: 300,
        flexDirection: 'column'
      },
    },
    cardMedia: {
      width: '150px',
      objectFit: 'contain'
    },
    actions: {
      width: '100%'
    }
  }),
);

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const OriPrice = styled.div`
  text-decoration: line-through;
  font-size:12px;
`
const Price = styled.div`
  color: red;
  font-size: 22px;
`

interface Props {
  data: IBook
}

const ImgMediaCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { data } = props
  const [qrcode, setQrCode] = useState<string|null>(null)
  const [seller, setSeller] = useState(null)

  useEffect(() => {
    getSeller()
  }, [])
  async function getSeller() {
    const res = await getUserByBookName(data.name)
    res.map((user: any) => {
      setSeller(user)
    })
  }

  const dial = async () => {
    if (seller !== null) {
      navigate(`/messageDetail/${seller.id}`)
    }
  }
  const [finish, setFinish] = useState(false)

  const serialize = function(obj:any) {
    var str = [];
    for (var p in obj)
     if (obj.hasOwnProperty(p)) {
      str.push(p + "=" + obj[p]);
     }
    return str.join("&");
   }
  const buyBook = async () => {
    handleClickOpen()
    const res = await buy(data.name, data.price)
    res.map(async (r: any) => {
      console.log(r)
      const url = `https://data.020zf.com/index.php?s=/api/pp/index_show.html`
      //const url = 'https://pay.020zf.com'
      const headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded')
      headers.append('Accept', 'application/json')
      const res = await fetch(url, {method:'post',headers ,body:serialize(r)})
      const data = await res.json()
      if(data.data.qrcode){
        const qr = `https://data.020zf.com/api.php/pp/scerweima2?url=${data.data.qrcode}`
        console.log(qr)
        setQrCode(qr)
        setTimeout(() => {
          setFinish(true)
        }, 3000);
      }
      //window.location.href = url
    })
  }

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  return (
    <>
    <Card className={classes.card}>
      <Column>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.name}
            </Typography>
            <a href={data.url}>
              <Typography gutterBottom variant="body2" component="p">
                {data.url}
              </Typography></a>
            <Typography variant="body2" color="textSecondary" component="p">
              {data.introduction}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Column style={{ width: 'auto', marginLeft: '10px' }}>
            <OriPrice>原价: ￥{data.origin_price}</OriPrice>
            <Price>￥{data.price}</Price>
          </Column>
          <Button onClick={buyBook} size="small" variant="contained" color="secondary">
            购买
        </Button>
          <Button onClick={dial} size="small" variant="contained" color="primary">
            联系卖家
        </Button>
          <Column style={{ width: 'auto', marginLeft: '10px' }}>
            <Typography style={{ fontSize: '12px' }} variant="body2">卖家</Typography>
            {seller && <Typography style={{ color: 'rgb(66,165,245)' }} variant="body2">{seller.username}</Typography>}
          </Column>
        </CardActions>
      </Column>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        alt="Contemplative Reptile"
        image={data.img_url}
        title="Contemplative Reptile"
      />
    </Card>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {!finish&&<DialogTitle id="form-dialog-title">支付 ￥{data.price}</DialogTitle>}
        <DialogContent>
          {finish? <Column style={{width:'300px',height:'300px'}}>
          <img width="100px" src={finishIcon}/>
          <Typography style={{marginTop:'20px'}} variant="h5">支付成功</Typography>
          </Column>: qrcode && <img width="300px" src={qrcode} />}
    </DialogContent>
      </Dialog>
    </>
  );
}

export default ImgMediaCard
