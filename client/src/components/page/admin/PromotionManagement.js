// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Modal } from 'react-bootstrap';
// import { getPromotions, createPromotion, deletePromotion } from '../../function/promotion';

// const PromotionManagement = () => {
//   const [promotions, setPromotions] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [promotionData, setPromotionData] = useState({
//     title: '',
//     description: '',
//     discountPercentage: '',
//     startDate: '',
//     endDate: '',
//     products: []
//   });

//   useEffect(() => {
//     fetchPromotions();
//     fetchProducts();
//   }, []);

//   const fetchPromotions = async () => {
//     try {
//       const data = await getPromotions(localStorage.getItem('authtoken'));
//       setPromotions(data.data);
//     } catch (error) {
//       console.error('Error fetching promotions:', error.message);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API}/products`);
//       setProducts(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleInputChange = (e) => {
//     setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
//   };

//   const handleCreatePromotion = async () => {
//     try {
//       await createPromotion(localStorage.getItem('authtoken'), promotionData);
//       fetchPromotions();
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error creating promotion:', error.message);
//     }
//   };

//   const handleDeletePromotion = async (id) => {
//     try {
//       await deletePromotion(localStorage.getItem('authtoken'), id);
//       fetchPromotions();
//     } catch (error) {
//       console.error('Error deleting promotion:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Promotion Management</h1>
//       <Button variant="primary" onClick={handleShowModal}>Create Promotion</Button>
//       <Table striped bordered hover className="mt-3">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Discount Percentage</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Products</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {promotions.map((promotion) => (
//             <tr key={promotion._id}>
//               <td>{promotion.title}</td>
//               <td>{promotion.description}</td>
//               <td>{promotion.discountPercentage}%</td>
//               <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
//               <td>{new Date(promotion.endDate).toLocaleDateString()}</td>
//               <td>{promotion.products.map(product => product.title).join(', ')}</td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDeletePromotion(promotion._id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Promotion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="title">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={promotionData.title}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="description"
//                 value={promotionData.description}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="discountPercentage">
//               <Form.Label>Discount Percentage</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="discountPercentage"
//                 value={promotionData.discountPercentage}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="startDate">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="startDate"
//                 value={promotionData.startDate}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="endDate">
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="endDate"
//                 value={promotionData.endDate}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="products">
//               <Form.Label>Products</Form.Label>
//               <Form.Control
//                 as="select"
//                 multiple
//                 name="products"
//                 value={promotionData.products}
//                 onChange={(e) => {
//                   const options = e.target.options;
//                   const selectedProducts = [];
//                   for (let i = 0; i < options.length; i++) {
//                     if (options[i].selected) {
//                       selectedProducts.push(options[i].value);
//                     }
//                   }
//                   setPromotionData({ ...promotionData, products: selectedProducts });
//                 }}
//               >
//                 {products.map((product) => (
//                   <option key={product._id} value={product._id}>
//                     {product.title}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCreatePromotion}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default PromotionManagement;
