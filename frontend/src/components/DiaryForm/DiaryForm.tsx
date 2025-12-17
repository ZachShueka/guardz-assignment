import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DiaryFormData } from '../../shared/types/diary';
import { useCallback, useMemo } from 'react';
import { diarySchema, MAX_TOPIC_LENGTH, MAX_BODY_LENGTH } from './constants';
import { FormHeader } from './FormHeader';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';
import './DiaryForm.css';

type DiaryFormProps = {
  onSubmit: (data: DiaryFormData) => Promise<void>;
  isLoading?: boolean;
  initialValues?: DiaryFormData;
};

export const DiaryForm = ({
  onSubmit,
  isLoading = false,
  initialValues,
}: DiaryFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diarySchema),
    defaultValues: initialValues ?? {
      topic: '',
      body: '',
    },
  });

  const onFormSubmit = useCallback(
    async (data: DiaryFormData) => {
      const trimmedData: DiaryFormData = {
        topic: data.topic.trim(),
        body: data.body.trim(),
      };
      await onSubmit(trimmedData);
      reset();
    },
    [onSubmit, reset]
  );

  const isFormBusy:boolean = useMemo(() => isSubmitting || isLoading, [isSubmitting, isLoading]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="diary-form">
      <FormHeader
        title="New Diary Entry"
        subtitle="Share your thoughts and experiences"
      />

      <fieldset disabled={isFormBusy} className="form-fieldset">
        <FormField<DiaryFormData>
          id="topic"
          name="topic"
          label="Topic"
          placeholder="What's on your mind?"
          register={register}
          control={control}
          errors={errors}
          disabled={isFormBusy}
          maxLength={MAX_TOPIC_LENGTH}
        />

        <FormField<DiaryFormData>
          id="body"
          name="body"
          label="Entry"
          placeholder="Write your thoughts here..."
          register={register}
          control={control}
          errors={errors}
          disabled={isFormBusy}
          maxLength={MAX_BODY_LENGTH}
          isTextarea
          rows={8}
        />
      </fieldset>

      <SubmitButton isLoading={isFormBusy} />
    </form>
  );
};


