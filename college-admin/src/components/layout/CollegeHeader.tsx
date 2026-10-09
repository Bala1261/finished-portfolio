import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../../router/Router';
import { useAdmin } from '../../context/AdminContext';
import {
  Building2,
  Bell,
  LogOut,
  Shield,
  AlertTriangle,
  Layers,
  ChevronDown,
  User,
  GraduationCap,
  Sparkles,
  Check,
  Search,
  Crown,
} from 'lucide-react';

interface CollegeHeaderProps {
  onToggleMobile: () => void;
}

export const CollegeHeader: React.FC<CollegeHeaderProps> = ({ onToggleMobile }) => {
  const { navigate } = useRouter();
  const {
    currentUser,
    setCurrentUser,
    staffUsers,
    logout,
    colleges,
    currentCollege,
    unreadNotificationCount,
    isCorporateAdmin,
  } = useAdmin();

  // Find college details strictly from authenticated identity
  const college = currentCollege || colleges.find(
    (c) => c.id === currentUser.collegeId || c.name === currentUser.collegeName
  ) || (isCorporateAdmin ? colleges[0] : undefined);

  const isSuspended =
    college?.status === 'Suspended' ||
    currentUser.accountStatus === 'SUSPENDED' ||
    currentUser.isActive === false;

  const quotaPercent = college
    ? Math.min(100, Math.round((college.quota.used / Math.max(1, college.quota.allocated)) * 100))
    : 0;

  const [personaOpen, setPersonaOpen] = useState(false);
  const personaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (personaRef.current && !personaRef.current.contains(e.target as Node)) {
        setPersonaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const personaGroups = [
    {
      group: 'College A: PSG Tech',
      badge: { text: 'ACTIVE', bg: '#DCFCE7', color: '#166534' },
      users: [
        { id: 'usr-psg-admin', name: 'Prof. Venkatesh', role: 'College Admin', dept: 'ECE / Admin' },
        { id: 'usr-psg-coord', name: 'Dr. Priya Murali', role: 'Coordinator', dept: 'CSE / Coordinator' },
        { id: 'usr-psg-staff', name: 'K. Anand', role: 'College Staff', dept: 'IT / Operations' },
      ],
    },
    {
      group: 'College B: KCT',
      badge: { text: 'ACTIVE', bg: '#DCFCE7', color: '#166534' },
      users: [
        { id: 'usr-kct-admin', name: 'Dr. Preetha S.', role: 'College Admin', dept: 'Admin' },
      ],
    },
    {
      group: 'College C: BIT',
      badge: { text: 'HIGH QUOTA', bg: '#EFF6FF', color: '#2563EB' },
      users: [
        { id: 'usr-bit-admin', name: 'Prof. M. Ramesh', role: 'College Admin', dept: 'Admin' },
      ],
    },
    {
      group: 'College D: CIT',
      badge: { text: 'SUSPENDED', bg: '#FEE2E2', color: '#991B1B' },
      users: [
        { id: 'usr-cit-admin', name: 'Dr. T. Sridhar', role: 'College Admin (Suspended)', dept: 'Admin' },
      ],
    },
    ...(isCorporateAdmin
      ? [
          {
            group: 'Corporate Central HQ',
            badge: { text: 'CENTRAL HQ', bg: '#FEF3C7', color: '#92400E' },
            users: [
              { id: 'usr-super-kavin', name: 'Kavinbalaji', role: 'Super Admin', dept: 'Central Platform HQ' },
            ],
          },
        ]
      : []),
  ];

  return (
    <div>
      {/* Top Main College Header */}
      <header
        style={{
          minHeight: '68px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        {/* Left: Mobile hamburger & College Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <button
            onClick={onToggleMobile}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <div style={{ width: '20px', height: '2px', backgroundColor: '#334155', marginBottom: '4px' }} />
            <div style={{ width: '20px', height: '2px', backgroundColor: '#334155', marginBottom: '4px' }} />
            <div style={{ width: '20px', height: '2px', backgroundColor: '#334155' }} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                flexShrink: 0,
                borderRadius: '10px',
                backgroundColor: isSuspended ? '#FEF2F2' : '#EFF6FF',
                border: isSuspended ? '1px solid #FECDD3' : '1px solid #BFDBFE',
                color: isSuspended ? '#E11D48' : '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '15px',
              }}
            >
              <Building2 size={22} />
            </div>

            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#0F172A',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '260px',
                    lineHeight: '1.25',
                    display: 'inline-block',
                  }}
                  title={college?.name || currentUser.collegeName}
                >
                  {college?.name || currentUser.collegeName || 'Institutional College'}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '4px',
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {college?.code || 'COL-INST'}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: isSuspended ? '#FEE2E2' : '#DCFCE7',
                    color: isSuspended ? '#991B1B' : '#166534',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isSuspended ? '#EF4444' : '#22C55E',
                    }}
                  />
                  {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                BEXO Institutional Portal • Scope ID: {currentUser.collegeId || college?.id || 'COL001'}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Global College-Scoped Search */}
        <div style={{ flex: '1', maxWidth: '380px', margin: '0 20px', position: 'relative' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem('hdrSearch') as HTMLInputElement)?.value;
              if (input && input.trim()) {
                navigate(`/college/students`);
              }
            }}
            style={{ width: '100%', position: 'relative' }}
          >
            <Search
              size={15}
              color="#94A3B8"
              style={{
                position: 'absolute',
                left: '11px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
            <input
              name="hdrSearch"
              type="text"
              placeholder={`Search ${college?.code || 'college'} students, jobs, staff...`}
              style={{
                width: '100%',
                height: '36px',
                padding: '0 12px 0 34px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                fontSize: '12.5px',
                color: '#0F172A',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.15s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#93C5FD';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.backgroundColor = '#F8FAFC';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </form>
        </div>

        {/* Right: Persona Switcher, Quota Bar, Notifications & User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          {/* Quick Persona Switcher for Testing Scenarios A-H */}
          <div ref={personaRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setPersonaOpen(!personaOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: personaOpen ? '#F8FAFC' : '#FFFFFF',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#1E293B',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.15s ease',
              }}
              title="Switch institutional testing persona"
            >
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B' }}>Persona:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {currentUser.role === 'super_admin' ? (
                  <Crown size={14} color="#D97706" />
                ) : (
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      fontSize: '10px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {currentUser.name.charAt(0)}
                  </div>
                )}
                <span style={{ fontWeight: 700, color: '#0F172A', maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name}
                </span>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '1px 5px',
                    borderRadius: '4px',
                    backgroundColor: currentUser.role === 'super_admin' ? '#FEF3C7' : '#F1F5F9',
                    color: currentUser.role === 'super_admin' ? '#92400E' : '#475569',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentUser.role === 'super_admin' ? 'Super Admin' : currentUser.role.replace('college_', '').replace('_', ' ')}
                </span>
              </div>
              <ChevronDown
                size={14}
                color="#64748B"
                style={{
                  transform: personaOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {personaOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: '320px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.06)',
                  zIndex: 100,
                  maxHeight: '440px',
                  overflowY: 'auto',
                  padding: '6px',
                }}
              >
                <div style={{ padding: '8px 10px 6px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.02em' }}>
                    Select Institutional Persona
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '1px' }}>
                    Simulate institutional college accounts & tenant permissions
                  </div>
                </div>

                {personaGroups.map((grp, gIdx) => (
                  <div key={gIdx} style={{ marginBottom: '8px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px 4px',
                        fontSize: '10.5px',
                        fontWeight: 800,
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <span>{grp.group}</span>
                      {grp.badge && (
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 800,
                            padding: '1px 5px',
                            borderRadius: '4px',
                            backgroundColor: grp.badge.bg,
                            color: grp.badge.color,
                          }}
                        >
                          {grp.badge.text}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {grp.users.map((u) => {
                        const isSelected = currentUser.id === u.id;
                        return (
                          <button
                            key={u.id}
                            onClick={() => {
                              const targetUser = staffUsers.find((su) => su.id === u.id);
                              if (targetUser) {
                                setCurrentUser(targetUser);
                                setPersonaOpen(false);
                                if (targetUser.collegeId) {
                                  navigate('/college/dashboard');
                                } else {
                                  navigate('/admin');
                                }
                              }
                            }}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'background-color 0.12s ease',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                              <div
                                style={{
                                  width: '26px',
                                  height: '26px',
                                  borderRadius: '50%',
                                  backgroundColor: u.id === 'usr-super-kavin' ? '#FEF3C7' : isSelected ? '#2563EB' : '#F1F5F9',
                                  color: u.id === 'usr-super-kavin' ? '#92400E' : isSelected ? '#FFFFFF' : '#475569',
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {u.id === 'usr-super-kavin' ? <Crown size={13} color="#D97706" /> : u.name.charAt(0)}
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: isSelected ? 800 : 600,
                                    color: isSelected ? '#1D4ED8' : '#0F172A',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  {u.name}
                                </div>
                                <div style={{ fontSize: '10.5px', color: isSelected ? '#2563EB' : '#64748B', whiteSpace: 'nowrap' }}>
                                  {u.role}
                                </div>
                              </div>
                            </div>

                            {isSelected && (
                              <Check size={14} color="#2563EB" style={{ flexShrink: 0, marginLeft: '6px' }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quota indicator widget */}
          {college && (
            <div
              style={{
                minWidth: '150px',
                padding: '5px 10px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
              }}
              className="quota-header-widget"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: 600, color: '#475569', marginBottom: '3px' }}>
                <span>Quota Usage</span>
                <span>{college.quota.used.toLocaleString()} / {college.quota.allocated.toLocaleString()}</span>
              </div>
              <div style={{ height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${quotaPercent}%`,
                    backgroundColor: isSuspended ? '#EF4444' : quotaPercent > 90 ? '#F59E0B' : '#2563EB',
                    borderRadius: '2px',
                  }}
                />
              </div>
            </div>
          )}

          {/* Notifications button */}
          <button
            onClick={() => navigate('/college/notifications')}
            style={{
              position: 'relative',
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="College Notifications"
          >
            <Bell size={17} />
            {unreadNotificationCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                }}
              />
            )}
          </button>

          {/* User Profile Capsule */}
          <div
            onClick={() => navigate('/college/profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              cursor: 'pointer',
            }}
            title="View Profile"
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              {currentUser.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                {currentUser.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    color: '#2563EB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {currentUser.role.replace('_', ' ')}
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 4px',
                    borderRadius: '3px',
                    backgroundColor: currentUser.accountStatus === 'ACTIVE' ? '#DCFCE7' : '#FEF3C7',
                    color: currentUser.accountStatus === 'ACTIVE' ? '#166534' : '#92400E',
                  }}
                >
                  {currentUser.accountStatus || 'ACTIVE'}
                </span>
              </div>
            </div>
          </div>



          {/* Logout */}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{
              padding: '7px 10px',
              borderRadius: '7px',
              backgroundColor: 'transparent',
              border: '1px solid #E2E8F0',
              color: '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
            }}
            title="Sign Out"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* College Suspension Banner */}
      {isSuspended && (
        <div
          style={{
            backgroundColor: '#BE123C',
            color: '#FFFFFF',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} color="#FECDD3" style={{ flexShrink: 0 }} />
            <div>
              <strong>INSTITUTIONAL SUSPENSION NOTICE:</strong> This college account is currently in{' '}
              <strong>SUSPENDED</strong> status by BEXO Administration. New student provisioning is blocked.
              Historical student records, provisioning logs, and audit trails remain preserved in read-only mode.
            </div>
          </div>
          <button
            onClick={() => navigate('/college/support')}
            style={{
              padding: '4px 12px',
              backgroundColor: '#FFFFFF',
              color: '#BE123C',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Contact BEXO Support
          </button>
        </div>
      )}
    </div>
  );
};
