import * as React from 'react';
import { User, Building2, Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

/**
 * GuestbookList 컴포넌트
 * 방명록 목록을 표시하는 컴포넌트
 *
 * Props:
 * @param {Array} entries - 방명록 데이터 배열 [Required]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 *
 * Example usage:
 * <GuestbookList entries={guestbookData} isLoading={false} />
 */
function GuestbookList({ entries, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground text-sm">방명록을 불러오는 중...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <MessageSquare className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground text-sm">
          아직 방명록이 없습니다. 첫 번째 방명록을 남겨보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <GuestbookEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

/**
 * GuestbookEntry 컴포넌트
 * 개별 방명록 항목을 표시하는 컴포넌트
 *
 * Props:
 * @param {object} entry - 방명록 데이터 객체 [Required]
 *
 * Example usage:
 * <GuestbookEntry entry={entryData} />
 */
function GuestbookEntry({ entry }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">
                  {entry.author_name || '익명'}
                </span>
              </div>

              {entry.organization && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span className="text-xs">{entry.organization}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-foreground whitespace-pre-wrap break-words">
              {entry.message}
            </p>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {formatDate(entry.created_at)}
              </span>

              {entry.is_email_public && entry.email && (
                <a
                  href={`mailto:${entry.email}`}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-3 w-3" />
                  {entry.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GuestbookList;
