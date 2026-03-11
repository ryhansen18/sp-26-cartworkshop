import { useState } from "react";
import { useCart } from "../context/useCart";
import styles from "./CheckoutForm.module.css";

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const initialFormData: FormData = {
  fullName: "", email: "", address: "", city: "", state: "", zip: "",
};

function validate(data: FormData): Partial<FormData> {
  const errors: Partial<FormData> = {};
  if (data.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (!data.email.includes("@")) errors.email = "Please enter a valid email address.";
  if (data.address.trim().length < 5) errors.address = "Please enter your address.";
  if (!data.city.trim()) errors.city = "Please enter your city.";
  if (!data.state) errors.state = "Please select a state.";
  if (!/^\d{5}$/.test(data.zip)) errors.zip = "Please enter a valid zip code.";
  return errors;
}

export default function CheckoutForm() {
  const { dispatch } = useCart();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched.has(name)) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors(newErrors);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name));
    const newErrors = validate(formData);
    setErrors(newErrors);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = new Set(Object.keys(formData));
    setTouched(allTouched);
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1500));
    dispatch({ type: "CLEAR_CART" });
    setIsSubmitting(false);
    setSuccess(true);
  }

  if (success) {
    return <div className={styles.success}> Your order is confirmed. Thanks for shopping with us!</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>

        <div className={styles.field}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName" name="fullName" type="text"
            value={formData.fullName} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={touched.has("fullName") && !!errors.fullName}
            aria-describedby="fullName-error"
          />
          {touched.has("fullName") && errors.fullName && (
            <span id="fullName-error" className={styles.error} role="alert">{errors.fullName}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email"
            value={formData.email} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={touched.has("email") && !!errors.email}
            aria-describedby="email-error"
          />
          {touched.has("email") && errors.email && (
            <span id="email-error" className={styles.error} role="alert">{errors.email}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="address">Shipping Address</label>
          <input
            id="address" name="address" type="text"
            value={formData.address} onChange={handleChange} onBlur={handleBlur}
            aria-invalid={touched.has("address") && !!errors.address}
            aria-describedby="address-error"
          />
          {touched.has("address") && errors.address && (
            <span id="address-error" className={styles.error} role="alert">{errors.address}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="city">City</label>
            <input
              id="city" name="city" type="text"
              value={formData.city} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={touched.has("city") && !!errors.city}
              aria-describedby="city-error"
            />
            {touched.has("city") && errors.city && (
              <span id="city-error" className={styles.error} role="alert">{errors.city}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="state">State</label>
            <select
              id="state" name="state"
              value={formData.state} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={touched.has("state") && !!errors.state}
              aria-describedby="state-error"
            >
            <option value="">Select a state</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
            </select>
            {touched.has("state") && errors.state && (
              <span id="state-error" className={styles.error} role="alert">{errors.state}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="zip">Zip Code</label>
            <input
              id="zip" name="zip" type="text"
              value={formData.zip} onChange={handleChange} onBlur={handleBlur}
              aria-invalid={touched.has("zip") && !!errors.zip}
              aria-describedby="zip-error"
            />
            {touched.has("zip") && errors.zip && (
              <span id="zip-error" className={styles.error} role="alert">{errors.zip}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}