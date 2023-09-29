import React, { useEffect, useState } from 'react'
import "./App.css";
import Navbar from './components/navbar';
import { FiSearch } from "react-icons/fi"
import { AiFillPlusCircle } from "react-icons/ai"
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from "./config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from "./components/ContactCard";
//import Modal from './components/Modal';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import NotFoundContact from './components/NotFoundContact';


const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclouse();



  useEffect(() => {
    const getContacts = async () => {
      try {

        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapShot) => {
          const contactLists = snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          });
          setContacts(contactLists);
          return contactLists;
        })

      } catch (error) {
        console.log(error)
      }

    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapShot) => {
      const contactLists = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    })
  }

  return (
    <>
      <div className='max-w-[370px] mx-auto px-4'>
        <Navbar />
        <div className='flex gap-2'>
          <div className='relative flex flex-grow items-center'>
            <FiSearch className='ml-1 text-3xl text-white absolute' />
            <input onChange={filterContacts} type="text" className='h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white' />
          </div>
          <AiFillPlusCircle onClick={onOpen} className='cursor-pointer text-5xl text-white' />
        </div>
        <div className='mt-4 gap-3 flex flex-col'>
          {contacts.length <= 0 ? <NotFoundContact/> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position='bottom-center' />
    </>
  )
}
export default App;