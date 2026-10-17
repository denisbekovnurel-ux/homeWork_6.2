import { useState } from "react";

const FIELDS = [
  {
    name: "deliveryAddress",
    label: "Адрес доставки",
    type: "text",
    required: true,
  },
  { name: "comment", label: "Комментарий", type: "textarea", required: false },
];

const validate = (values) => {
  const errors = {};
  FIELDS.forEach(({ name, label, required }) => {
    if (required && !values[name]?.trim()) {
      errors[name] = `Заполните поле «${label}»`;
    }
  });
  return errors;
};

export function OrderForm({ onSubmit, isPending }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map((f) => [f.name, ""])),
  );
  const [touched, setTouched] = useState({});

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleBlur = (e) =>
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || isPending) return;
    onSubmit(values);
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-[#dfe9e2] px-4 py-2 outline-none focus:border-[#0d8b67]";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 rounded-2xl border border-[#dfe9e2] bg-white p-6"
    >
      <h2 className="text-xl font-bold text-[#1d2321]">Оформление заказа</h2>

      {FIELDS.map(({ name, label, type, required }) => (
        <label key={name} className="block">
          <span className="text-sm font-medium text-[#1d2321]">
            {label}
            {required && " *"}
          </span>

          {type === "textarea" ? (
            <textarea
              name={name}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={inputClass}
            />
          ) : (
            <input
              name={name}
              type={type}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass}
            />
          )}

          {touched[name] && errors[name] && (
            <span className="mt-1 block text-sm text-red-500">
              {errors[name]}
            </span>
          )}
        </label>
      ))}

      <button
        type="submit"
        disabled={!isValid || isPending}
        className="rounded-full bg-[#0d8b67] px-6 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Отправка..." : "Оформить заказ"}
      </button>
    </form>
  );
}
