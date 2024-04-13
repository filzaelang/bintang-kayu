import React,{ useState , useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import '../styles/login.css';
import { useParams } from "react-router-dom";
import { db } from '../firebase.config';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore'

const DetailOrder = () => {

    const {id} = useParams();
    const [pesanan, setPesanan] = useState({});
    const docRef = doc(db,'Pesanan', id);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getPesanan = async()=>{
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setPesanan(docSnap.data());
                
            } else {
                console.log('Tidak ada pesanan')
            }
        }

        getPesanan()
    },[])

    const {idPembeli, idPesanan, idProduk, jumlahBarang, namaProduk, status, tanggalCetakKwitansi, tanggalPemesanan, harga, fotoCover, fotoBuktiPembayaran } = pesanan;

    useEffect(() => {
        window.scrollTo(0,0)
    }, [pesanan]);

    //Dapatkan User
    const [email, setEmail] = useState('');
    const [totalHarga, setTotalHarga] = useState('');

    //Dapatkan tanggal
    const [tanggalPesan, setTanggalPesan] = useState('');

    const a = query(collection(db, "Pesanan"), where("idPesanan", "==", id ));
    getDocs(a).then(docSnap => {
        let users = [];
        docSnap.forEach((doc)=> {
            users.push({ ...doc.data(), id:doc.id })
        });
        const tanggalPesan1 = users[0]['tanggalPemesanan'];
        const tanggalKonfirmasi1 = users[0]['tanggalCetakKwitansi'];
        const email1 = users[0]['idPembeli'];
        const totalHarga1 = users[0]['harga'];
        setTanggalPesan(tanggalPesan1)
        setEmail(email1)
        setTotalHarga(totalHarga1)
    });

    //Mendapatkan detail Pembeli
    const [nama, setNama] = useState('');
    const [alamat2, setAlamat2] = useState('');
    const [noHp2, setNoHp2] = useState('');

    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then(docSnap => {
        let users = [];
        docSnap.forEach((doc)=> {
            users.push({ ...doc.data(), id:doc.id })
        });
        const nama1 = users[0]['nama'];
        const alamat1 = users[0]['alamat'];
        const noHp1 = users[0]['nomorTelepon'];
        setNama(nama1)
        setAlamat2(alamat1)
        setNoHp2("+62" + noHp1)
    });
    /////////////////////////////////////////////////

    

    const fireBaseTime = new Date(
        tanggalPesan.seconds * 1000 + tanggalPesan.nanoseconds / 1000000,
      );
      const date = fireBaseTime.toDateString();
      const atTime = fireBaseTime.toLocaleTimeString();
      const tanggalPesanFinal = date + "  " + atTime;
    

    return (
        
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? <h4 className="py-5">Loading......</h4> : <>
                            
                                <h4 className="mb-5">Detail Pesanan</h4>
                                <div className="form-box">
                                    <Form>
                                        <FormGroup className="form__group">
                                            <span>Waktu Pemesanan</span>
                                            <input type="text"
                                                value={tanggalPesanFinal}
                                                disabled />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Status Pemesanan</span>
                                            <input type="text"
                                                value={status}
                                                disabled />
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="form-box">
                                    <Form>
                                        <FormGroup className="form__group">
                                            <span>Nama Produk</span>
                                            <input type="text"
                                                value={namaProduk}
                                                disabled />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Foto Produk</span>
                                            <img src={fotoCover} alt="" />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Jumlah Produk dipesan</span>
                                            <input type="text"
                                                value={jumlahBarang}
                                                disabled />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Total Harga</span>
                                            <input type="text"
                                                value={totalHarga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                                disabled />
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="form-box">
                                    <Form>
                                        <FormGroup className="form__group">
                                            <span>Nama Pembeli</span>
                                            <input type="text"
                                                value={nama}
                                                disabled />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Nomor Hp Pembeli</span>
                                            <input type="text"
                                                value={noHp2}
                                                disabled />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Alamat Pembeli</span>
                                            <input type="text"
                                                value={alamat2}
                                                disabled />
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Foto Bukti Pembayaran</span>
                                            <img src={fotoBuktiPembayaran} alt="" />
                                        </FormGroup>
                                    </Form>
                                </div>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default DetailOrder;