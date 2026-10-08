import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const FoodCategoryEdit = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


  // =========================
  // Fetch Food Category
  // =========================

  useEffect(() => {

    fetchFoodCategory()

  }, [id])


  const fetchFoodCategory = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await fetch(
        `http://localhost:5000/api/food-categories/${id}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch food category')
      }

      const data = await response.json()

      console.log('Edit Category Response:', data)


      if (!data.success) {

        throw new Error(
          data.message || 'Food category not found'
        )

      }


      // =========================
      // Set Existing Data
      // =========================

      setFormData({

        name: data.data.name || '',

        description: data.data.description || '',

      })

    } catch (err) {

      console.error('Error:', err)

      setError(
        err.message || 'Unable to load food category'
      )

    } finally {

      setLoading(false)

    }

  }


  // =========================
  // Form Change
  // =========================

 const handleChange = (e) => {

  const { name, value } = e.target

  setFormData({
    ...formData,
    [name]: value,
  })

}


  // =========================
  // Submit
  // Update API পরে হবে
  // =========================
const handleSubmit = async (e) => {

  e.preventDefault()

  try {

    setLoading(true)
    setError('')


    // =========================
    // PUT UPDATE API
    // =========================

    const response = await fetch(
      `http://localhost:5000/api/food-categories/${id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      }
    )


    const data = await response.json()


    // =========================
    // API ERROR
    // =========================

    if (!response.ok || !data.success) {

      throw new Error(
        data.message || 'Failed to update food category'
      )

    }


    // =========================
    // SUCCESS
    // =========================

    navigate('/master/food-category', {
      state: {
        successMessage:
          data.message ||
          'Food category updated successfully',
      },
    })


  } catch (err) {

    console.error('Update Error:', err)

    setError(
      err.message ||
      'Unable to update food category'
    )

  } finally {

    setLoading(false)

  }

}

  // =========================
  // Loading
  // =========================

  if (loading) {

    return (
      <div className="text-center py-4">
        Loading food category...
      </div>
    )

  }


  // =========================
  // Error
  // =========================

  if (error) {

    return (
      <div>

        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() =>
            navigate('/master/food-category')
          }
        >
          Back to List
        </button>

      </div>
    )

  }


  // =========================
  // UI
  // =========================

  return (

    <div>

      <h4 className="mb-3">
        Edit Food Category
      </h4>


      <form onSubmit={handleSubmit}>


        {/* Name */}

        <div className="mb-3">

          <label className="form-label">
            Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />

        </div>


        {/* Description */}

        <div className="mb-3">

          <label className="form-label">
            Description
          </label>

          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />

        </div>

        {/* Buttons */}

        <button
          type="submit"
          className="btn btn-primary me-2"
        >
          Update
        </button>


        <button
          type="button"
          className="btn btn-secondary"
          onClick={() =>
            navigate('/master/food-category')
          }
        >
          Cancel
        </button>


      </form>

    </div>

  )

}

export default FoodCategoryEdit

