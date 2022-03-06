import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/server';
import styles from '@/styles/Form.module.css';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';

const slugify = require('slugify')



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { route } from 'next/dist/server/router';

export default function EditEventPage({id,evt}){

const [values,setValues] = useState({
    id: id,
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    slug: evt.slug,
    description: evt.description,
});

const [imagePreview,setImagePreview] = useState(evt.image ? evt.image.data.attributes.formats.thumbnail.url : null)

const [showModal,setShowModal] = useState(false);

const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");

        values.slug = slugify(values.name,{lower:true});

        const hasEmptyFields = Object.values(values).some((value) => {
            return value == '';
        });

        if (hasEmptyFields) {
            toast.error("Please fill in all Fields");
        }
        else{

            

            const res = await fetch(`${API_URL}/api/events/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"data": values})
            });
    
            if (!res.ok) {
                toast.error("Sth went wrong.");
                console.log(res);
    
            } else {
                const {data} = await res.json();

                console.log(data.attributes.slug);
                await router.push(`/events/${data.attributes.slug}`);
            }
        }

        

    }

const handleInputChange = (e) => {
    const {name,value} = e.target
    values[e.target.id] = e.target.value;
        setValues({...values, [name]: value});
}

return <Layout title="Add an event">
    <Link href='/events'><a>Go Back</a></Link>
    <h1>Edit Event here</h1>

    <ToastContainer/>
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
        <div>
            <label htmlFor='name'>Event Name</label>
            <input type="text" placeholder='Event Name' id='name' name='name' value={values.name} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor='performers'>Performers</label>
            <input type="text" placeholder='Performers' id='performers' name='performers' value={values.performers} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor='venue'>Venue</label>
            <input type="text" placeholder='Venue' id='venue' name='venue' value={values.venue} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor='address'>Address</label>
            <input type="text" placeholder='Address' id='address' name='address' value={values.address} onChange={handleInputChange}/>
        </div>
        <div>
            <label htmlFor='date'>Date</label>
            <input type="date" placeholder='Date' id='date' name='date' value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}/>
        </div>

        <div>
            <label htmlFor='time'>Start Time</label>    
            <input type="text" placeholder='18:00' id='time' name='time' value={values.time} onChange={handleInputChange}/>
        </div>


        </div>
        <div>
        <label htmlFor='description'>Description</label>    
        <textarea type="text" placeholder='Description' id='description' name='description' value={values.description} onChange={handleInputChange}>

        </textarea>
        </div>

        <input type='submit' className='btn' value='Update Event'/>
        
    </form>

    <h2>Event Image</h2>
    {imagePreview ? <Image width={170} height={100} alt="event image" src={imagePreview} />: <div>No image uploaded</div>}

    <div><button className="btn-secondary">
        <FaImage /> Set Image
        </button></div>
        <Modal show={showModal} onClose={()=> setShowModal(false)} title={'upload image'}>
            Image Upload
        </Modal>
</Layout>
}

export async function getServerSideProps({params:{id}}){

    const res = await fetch(`${API_URL}/api/events/?populate=*&filters[id][$eq]=${id}`);
    const evt = await res.json(); 

    //console.log(evt.data[0].attributes.image.data.thumbnail)

    return {
      props: {
          id: evt.data[0].id,
          evt: evt.data[0].attributes
        }
    }
}