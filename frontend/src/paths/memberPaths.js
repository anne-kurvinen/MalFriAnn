import axios from 'axios';

const createMember = async (memberData) => {
  try {
    const response = await axios.post('/api/members', memberData);
    console.log('New member created:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error creating new member:', error);
    throw error; 
  }
};

export default createMember;
