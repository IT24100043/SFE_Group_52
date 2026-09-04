import { useState } from 'react';
import { Spinner } from './Loading';

function toDateInputValue(date) {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export default function TaskForm({ mode = 'create', initialValues, onSubmit, submitting, submitLabel }) {
  const [values, setValues] = useState({
    Topic: initialValues?.Topic || '',
    Description: initialValues?.Description || '',
    Start_Date: toDateInputValue(initialValues?.Start_Date) || todayInputValue(),
    End_Date: toDateInputValue(initialValues?.End_Date) || '',
    Priority: initialValues?.Priority || '',
    Done: initialValues?.Done ?? false,
  });
  const [errors, setErrors] = useState({});

  function set(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!values.Topic.trim()) next.Topic = 'Topic is required.';
    if (!values.Description.trim()) next.Description = 'Description is required.';
    else if (values.Description.trim().length < 20) next.Description = 'Description must be at least 20 characters.';
    if (!values.End_Date) next.End_Date = 'Due date is required.';
    else if (mode === 'create' && values.End_Date < todayInputValue()) next.End_Date = 'Due date cannot be in the past.';
    if (!values.Priority) next.Priority = 'Please select a priority.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      Topic: values.Topic.trim(),
      Description: values.Description.trim(),
      End_Date: values.End_Date,
      Priority: values.Priority,
      Done: values.Done,
    };
    if (mode === 'edit') payload.Start_Date = values.Start_Date;
    onSubmit(payload);
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 outline-none transition-colors focus:ring-2 focus:ring-brand-200 ${
      errors[field] ? 'border-rose-accent focus:border-rose-accent' : 'border-ink-300 focus:border-brand-400'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="Topic" className="block text-sm sm:text-base font-bold text-ink-800 mb-2">
          Topic
        </label>
        <input
          id="Topic"
          type="text"
          value={values.Topic}
          onChange={(e) => set('Topic', e.target.value)}
          placeholder="e.g. Software Engineering Assignment"
          className={inputClass('Topic')}
        />
        {errors.Topic && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.Topic}</p>}
      </div>

      <div>
        <label htmlFor="Description" className="block text-sm sm:text-base font-bold text-ink-800 mb-2">
          Description
        </label>
        <textarea
          id="Description"
          rows={4}
          value={values.Description}
          onChange={(e) => set('Description', e.target.value)}
          placeholder="Describe what needs to be done (min. 20 characters)..."
          className={`${inputClass('Description')} resize-none`}
        />
        <div className="mt-2 flex items-center justify-between">
          {errors.Description ? (
            <p className="text-sm font-semibold text-rose-accent">{errors.Description}</p>
          ) : (
            <span className="text-xs sm:text-sm font-medium text-ink-400">{values.Description.trim().length}/20 min characters</span>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {mode === 'edit' ? (
          <div>
            <label htmlFor="Start_Date" className="block text-sm sm:text-base font-bold text-ink-800 mb-2">
              Start Date
            </label>
            <input
              id="Start_Date"
              type="date"
              value={values.Start_Date}
              onChange={(e) => set('Start_Date', e.target.value)}
              className={inputClass('Start_Date')}
            />
          </div>
        ) : (
          <div>
            <span className="block text-sm sm:text-base font-bold text-ink-800 mb-2">Start Date</span>
            <div className="w-full rounded-xl border border-ink-200 bg-ink-100/60 px-4 py-3 text-base font-medium text-ink-600">
              Starts today
            </div>
          </div>
        )}

        <div>
          <label htmlFor="End_Date" className="block text-sm sm:text-base font-bold text-ink-800 mb-2">
            Due Date
          </label>
          <input
            id="End_Date"
            type="date"
            value={values.End_Date}
            onChange={(e) => set('End_Date', e.target.value)}
            className={inputClass('End_Date')}
          />
          {errors.End_Date && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.End_Date}</p>}
        </div>
      </div>

      <div>
        <span className="block text-sm sm:text-base font-bold text-ink-800 mb-2">Priority</span>
        <div className="grid grid-cols-3 gap-3">
          {['High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => set('Priority', level)}
              className={`rounded-xl border px-3 py-3 text-sm sm:text-base font-bold transition-all ${
                values.Priority === level
                  ? level === 'High'
                    ? 'border-rose-accent bg-rose-accent/15 text-rose-accent shadow-sm'
                    : level === 'Medium'
                    ? 'border-amber-accent bg-amber-accent/15 text-amber-accent shadow-sm'
                    : 'border-teal-accent bg-teal-accent/15 text-teal-accent shadow-sm'
                  : 'border-ink-200/80 bg-surface text-ink-600 hover:bg-ink-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        {errors.Priority && <p className="mt-2 text-sm font-semibold text-rose-accent">{errors.Priority}</p>}
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-ink-200/80 bg-surface px-4 py-3.5 cursor-pointer hover:bg-ink-100 transition-colors">
        <input
          type="checkbox"
          checked={values.Done}
          onChange={(e) => set('Done', e.target.checked)}
          className="w-5 h-5 rounded accent-brand-500"
        />
        <span className="text-sm sm:text-base font-semibold text-ink-800">
          {mode === 'create' ? 'Mark as already completed' : 'Mark as completed'}
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-base font-bold text-white shadow-md hover:bg-brand-600 transition-colors disabled:opacity-60"
      >
        {submitting && <Spinner size={18} />}
        {submitLabel}
      </button>
    </form>
  );
}
