import React, { useState } from 'react';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddClientModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [addClient] = useMutation(ADD_CLIENT,{
    variables:{name:formData.name, email:formData.email, phone:formData.phone},
    update(cache, {data:{addClient}}){
      const {clients} = cache.readQuery({query: GET_CLIENTS})
      cache.writeQuery({
        query: GET_CLIENTS,
        data:{clients: [...clients, addClient]}
      })
    }
  })

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^(?:\d[ -]?){6,14}\d$/
.test(formData.phone)) {
      newErrors.phone = 'Phone must be 7 to 15 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Form submitted:', formData);
    addClient(formData.name, formData.email, formData.phone)

    setShow(false); // close modal
    setFormData({ name: '', email: '', phone: '' }); // reset form
    setErrors({});
  };

  return (
    <>
      <button className="btn border-green border-3  text-green" onClick={() => setShow(true)}>
        Add Client
      </button>

      {show && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-info">

              <div className="modal-header">
                <h5 className="modal-title">Add Client</h5>
                <button
  type="button"
  className="btn-close"
  style={{ filter: 'invert(38%) sepia(99%) saturate(461%) hue-rotate(162deg) brightness(95%) contrast(89%)' }}
  onClick={() => setShow(false)}
></button>

              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className={`form-control border-info border-3 text-dark  ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control border-info border-3 text-dark ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className={`form-control border-info border-3 text-dark ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <button type="submit" className="btn btn-info text-white">
                    Submit
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default AddClientModal;
