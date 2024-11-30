import { useRef, useState } from 'react';

type FormData = Record<string, any>;

const useFormData = <T extends FormData>(initial: T) => {
  const form = useRef<HTMLFormElement | null>(null); // Correctly type the form ref

  const [formData, setFormData] = useState<FormData>({});

  const getFormData = (): FormData => {
    if (!form.current) return {}; // Add null check
    const fd = new FormData(form.current);
    const obj: FormData = {};
    fd.forEach((value, key) => {
      const str = key.split(':');
      if (str.length > 1) {
        obj[str[0]] = { ...obj[str[0]], [str[1]]: value };
      } else {
        obj[str[0]] = value;
      }
    });
    return obj;
  };

  const updateFormData = () => {
    setFormData(getFormData());
  };

  return { form, formData, updateFormData } as const;
};

export default useFormData;
