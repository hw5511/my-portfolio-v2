import * as React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../lib/utils';

/**
 * ContactInfoCard 컴포넌트
 * 연락처 정보와 SNS 아이콘 버튼을 표시하는 카드
 *
 * Example usage:
 * <ContactInfoCard />
 */
function ContactInfoCard() {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:example@email.com',
      text: 'example@email.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/hw5511',
      text: 'github.com/hw5511',
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/hw5511' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:example@email.com' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">연락처</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <link.icon className="h-5 w-5" />
            <span className="text-sm">{link.text}</span>
          </a>
        ))}

        <div className="flex gap-2 pt-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={cn(
                'inline-flex items-center justify-center rounded-full h-10 w-10',
                'border border-input bg-background',
                'hover:bg-accent hover:text-accent-foreground',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactInfoCard;
