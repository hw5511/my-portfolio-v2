import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { supabase } from '../../lib/supabase';
import ContactInfoCard from '../contact/contact-info-card';
import GuestbookForm from '../contact/guestbook-form';
import GuestbookList from '../contact/guestbook-list';

/**
 * ContactSection 컴포넌트
 * 연락처 카드 + SNS 아이콘 + 방명록(Supabase 연동) 섹션
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [entries, setEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchEntries = React.useCallback(async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setEntries(data || []);
    } catch (err) {
      console.error('Failed to fetch guestbook entries:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-center mb-8">
          Contact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 연락처 카드 */}
          <div className="md:col-span-1">
            <ContactInfoCard />
          </div>

          {/* 방명록 섹션 */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">방명록</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <GuestbookForm onSubmitSuccess={fetchEntries} />
                <div className="border-t pt-6">
                  <GuestbookList entries={entries} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
