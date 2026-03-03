import React, { useState } from 'react';
import Tooltip from './Tooltip';

const AssignmentForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: any = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      errs.email = 'Enter a valid university email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8)
      errs.password = 'Password must be at least 8 characters';
    if (!file) errs.file = 'Please upload your assignment';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // do submit
    console.log('submitting', { email, password, file });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ width: 400 }}>
      <h2>Submit Assignment</h2>

      <div className="input-group">
        <label>
          <Tooltip text="Enter a valid university email">
            Email
          </Tooltip>
        </label>
        <Tooltip text="Fill this field">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@university.edu"
          />
        </Tooltip>
        {errors.email && <span className="input-error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <label>
          <Tooltip text="Password must be at least 8 characters">
            Password
          </Tooltip>
        </label>
        <Tooltip text="Fill this field">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Tooltip>
        {errors.password && (
          <span className="input-error">{errors.password}</span>
        )}
      </div>

      <div className="input-group">
        <label>
          <Tooltip text="Click to upload assignment">
            Assignment File
          </Tooltip>
        </label>
        <Tooltip text="Click to upload assignment">
          <input
            type="file"
            onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </Tooltip>
        {errors.file && <span className="input-error">{errors.file}</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AssignmentForm;
