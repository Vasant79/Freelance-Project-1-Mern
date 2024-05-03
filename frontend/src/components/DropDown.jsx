export default function DropDown({ children, id, setState, options }) {
  function handleChange(event) {
    setState(event.target.value);
  }
  return (
    <select id={id} className=" mx-2 mt-2 min-w-16" onChange={handleChange}>
      <option>{children}</option>
      {options.map((eachValue) => {
        return (
          <option key={eachValue} value={eachValue}>
            {String(eachValue)}
          </option>
        );
      })}
    </select>
  );
}

// <option value={children}>{children}</option>
// <option value="Sales">Sales</option>
// <option value="Marketing">Marketing</option>
// <option value="IT">IT</option>
// <option value="Finance">Finance</option>
// // {/* <option value="Business Development">Business Development</option> */}
