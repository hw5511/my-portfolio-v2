import * as React from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabase';

/**
 * GuestbookForm 컴포넌트
 * 방명록 작성 폼
 *
 * Props:
 * @param {function} onSubmitSuccess - 방명록 작성 성공 시 호출되는 콜백 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmitSuccess={handleRefresh} />
 */
function GuestbookForm({ onSubmitSuccess }) {
  const [formData, setFormData] = React.useState({
    author_name: '',
    message: '',
    organization: '',
    email: '',
    is_email_public: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.message.trim()) {
      setError('메시지를 입력해주세요.');
      return;
    }

    if (!supabase) {
      setError('서비스에 연결할 수 없습니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      const insertData = {
        message: formData.message.trim(),
        author_name: formData.author_name.trim() || null,
        organization: formData.organization.trim() || null,
        email: formData.email.trim() || null,
        is_email_public: formData.is_email_public,
      };

      const { error: insertError } = await supabase
        .from('guestbook')
        .insert([insertData]);

      if (insertError) {
        throw insertError;
      }

      setFormData({
        author_name: '',
        message: '',
        organization: '',
        email: '',
        is_email_public: false,
      });

      onSubmitSuccess();
    } catch (err) {
      setError('방명록 작성에 실패했습니다. 다시 시도해주세요.');
      console.error('Guestbook submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="author_name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            이름 <span className="text-muted-foreground">(선택)</span>
          </label>
          <input
            id="author_name"
            name="author_name"
            type="text"
            placeholder="익명"
            value={formData.author_name}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-foreground mb-1"
          >
            소속/직업 <span className="text-muted-foreground">(선택)</span>
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            placeholder="회사명 또는 직업"
            value={formData.organization}
            onChange={handleChange}
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-1"
        >
          메시지 <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="방명록을 남겨주세요..."
          value={formData.message}
          onChange={handleChange}
          className={`${inputClassName} resize-none`}
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-1"
        >
          이메일 <span className="text-muted-foreground">(선택)</span>
        </label>
        <div className="space-y-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClassName}
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="is_email_public"
              checked={formData.is_email_public}
              onChange={handleChange}
              className="rounded border-input"
            />
            이메일을 공개합니다
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          '작성 중...'
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            방명록 남기기
          </>
        )}
      </Button>
    </form>
  );
}

export default GuestbookForm;
