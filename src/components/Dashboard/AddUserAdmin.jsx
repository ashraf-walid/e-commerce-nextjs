'use client';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { User, Mail, Shield, ShieldCheck, ShieldX, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUserAdmin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingUid, setProcessingUid] = useState(null);
  
    const getAuthToken = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');
      return await user.getIdToken();
    };
  
    const fetchUsers = async () => {
      try {
        setError(null);
        const token = await getAuthToken();
        const res = await fetch('/api/admin-users', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const setAdmin = async (uid) => {
      try {
        setProcessingUid(uid);
        setError(null);
        const token = await getAuthToken();
        const res = await fetch('/api/admin-users/set-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ uid }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to set admin');
        }
        await fetchUsers();
        toast.success('Admin privileges granted successfully');
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setProcessingUid(null);
      }
    };
  
    const removeAdmin = async (uid) => {
      try {
        setProcessingUid(uid);
        setError(null);
        const token = await getAuthToken();
        const res = await fetch('/api/admin-users/remove-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ uid }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to remove admin');
        }
        await fetchUsers();
        toast.success('Admin privileges removed successfully');
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setProcessingUid(null);
      }
    };
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-center">{error}</p>
            <button 
              onClick={fetchUsers}
              className="mt-4 w-full bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                    <h1 className="text-xl font-semibold text-white">User Management</h1>
                    <p className="text-blue-100 text-sm mt-1">Manage admin privileges for users</p>
                </div>
                
                <div className="p-4">
                    <div className="grid gap-4">
                        {users.map(user => (
                            <div key={user.uid} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-200 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <p className="text-gray-600"><span className="font-medium">UID:</span> {user.uid}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                            <p className="text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {user.isAdmin ? (
                                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <Shield className="w-5 h-5 text-gray-400" />
                                            )}
                                            <p className="text-gray-600">
                                                <span className="font-medium">Status:</span>
                                                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                                    user.isAdmin 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {user.isAdmin ? 'Admin' : 'User'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-shrink-0">
                                        {user.isAdmin ? (
                                            <button
                                                onClick={() => removeAdmin(user.uid)}
                                                disabled={processingUid === user.uid}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                                    processingUid === user.uid
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                }`}
                                            >
                                                {processingUid === user.uid ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldX className="w-5 h-5" />
                                                        <span>Remove Admin</span>
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setAdmin(user.uid)}
                                                disabled={processingUid === user.uid}
                                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                                    processingUid === user.uid
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                                                }`}
                                            >
                                                {processingUid === user.uid ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        <span>Processing...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="w-5 h-5" />
                                                        <span>Make Admin</span>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
