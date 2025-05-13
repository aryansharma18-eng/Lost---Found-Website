import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const Found = () => {
  const [formData, setFormData] = useState({
    finderId: '',
    itemName: '',
    description: '',
    foundLocation: '',
    foundDate: '',
    contactNumber: '',
    itemImage: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = '';

    // Step 1: Upload to Cloudinary (if image is selected)
    if (formData.itemImage) {
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dgw6vpjw6/image/upload';
      const data = new FormData();
      data.append('file', formData.itemImage);
      data.append('upload_preset', 'LostandFound_upload');// Must be an unsigned preset

      data.append('folder', 'Found_Items'); 
      try {
        const cloudRes = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: data
        });

        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      } catch (err) {
        console.error('Image upload failed:', err);
        return;
      }
    }

    // Step 2: Submit form data along with image URL
    const submissionData = {
      ...formData,
      itemImage: imageUrl || null
    };

    try {
      const res = await fetch("http://localhost:5000/api/foundReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      const result = await res.json();
      console.log(result);

      // Reset form
      setFormData({
        finderId: '',
        itemName: '',
        description: '',
        foundLocation: '',
        foundDate: '',
        contactNumber: '',
        itemImage: null
      });
    } catch (err) {
      console.error('Form submission failed:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Report Found Item</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="finderId">
            Your University ID*
          </label>
          <input
            type="text"
            id="finderId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your university ID"
            value={formData.finderId}
            onChange={(e) => setFormData({...formData, finderId: e.target.value})}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemName">
            Item Name*
          </label>
          <input
            type="text"
            id="itemName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="What did you find?"
            value={formData.itemName}
            onChange={(e) => setFormData({...formData, itemName: e.target.value})}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Brief Description*
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
            placeholder="Provide a brief description of the found item..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foundLocation">
            Found Location*
          </label>
          <input
            type="text"
            id="foundLocation"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Where did you find the item?"
            value={formData.foundLocation}
            onChange={(e) => setFormData({...formData, foundLocation: e.target.value})}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foundDate">
            Found Date*
          </label>
          <input
            type="datetime-local"
            id="foundDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.foundDate}
            onChange={(e) => setFormData({...formData, foundDate: e.target.value})}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
            Contact Number*
          </label>
          <input
            type="tel"
            id="contactNumber"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your contact number"
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Item Image*
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="item-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    id="item-upload"
                    name="item-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, itemImage: e.target.files?.[0] || null})}
                    required
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Found Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default Found;