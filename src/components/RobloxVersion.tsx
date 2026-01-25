import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Monitor, Apple, AlertCircle } from 'lucide-react';

interface PastVersionInfo {
  Windows: string;
  WindowsDate: string;
  Mac: string;
  MacDate: string;
}

interface VersionInfo {
  windows: string;
  windowsDate: string;
  mac: string;
  macDate: string;
}

export const RobloxVersion = () => {
  const [loading, setLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState<VersionInfo>({
    windows: '未知版本',
    windowsDate: '未知日期',
    mac: '未知版本',
    macDate: '未知日期'
  });
  const [pastVersion, setPastVersion] = useState<PastVersionInfo | null>(null);

  const getRobloxVersion = async () => {
    const endpoint = "https://inject.today/api/versions/current";
    
    try {
      const response = await fetch(endpoint, {
        headers: {}
      });
      if (response.ok) {
        const data = await response.json();
        return {
          windows: data.Windows.Version || '未知版本',
          windowsDate: data.Windows.Date || '未知日期',
          mac: data.Macintosh.Version || '未知版本',
          macDate: data.Macintosh.Date || '未知日期'
        };
      }
    } catch (error) {
      console.error('Failed to fetch Roblox version:', error);
    }
    
    return {
      windows: '未知版本',
      windowsDate: '未知日期',
      mac: '未知版本',
      macDate: '未知日期'
    };
  };

  const getRobloxPastVersion = async () => {
    const endpoint = "http://farts.fadedis.xyz:25551/api/versions/past";
    
    try {
      const response = await fetch(endpoint, {
        headers: {}
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          return {
            Windows: data.Windows || '未知版本',
            WindowsDate: data.WindowsDate || '未知日期',
            Mac: data.Mac || '未知版本',
            MacDate: data.MacDate || '未知日期'
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch past Roblox version:', error);
    }
    
    return null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === '未知日期') {
      return '未知日期';
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Shanghai'
      });
    } catch (error) {
      return dateString;
    }
  };

  const openDownloadLink = (url: string) => {
    window.open(url, '_blank');
  };

  const fetchVersion = async () => {
    setLoading(true);
    
    const [version, past] = await Promise.all([
      getRobloxVersion(),
      getRobloxPastVersion()
    ]);
    
    setCurrentVersion(version);
    setPastVersion(past);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-violet-400" />
            Roblox版本
          </h3>
          <p className="text-sm text-slate-400">检查Roblox版本</p>
        </div>
        <button 
          onClick={fetchVersion}
          disabled={loading}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Windows Version Card */}
        <div className="p-5 rounded-xl bg-green-500/5 border border-green-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Monitor className="w-20 h-20 text-green-400" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/20">
                WINDOWS
              </span>
              <span className="text-xs text-slate-400">{loading ? '加载中...' : formatDate(currentVersion.windowsDate)}</span>
            </div>
            
            <div className="font-mono text-lg text-white mb-4 break-all">
              {loading ? (
                <div className="h-7 w-32 bg-white/10 rounded animate-pulse" />
              ) : (
                currentVersion.windows
              )}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  if (currentVersion.windows !== '未知版本') {
                    const url = `https://rdd.weao.gg/?channel=LIVE&binaryType=WindowsPlayer&version=${currentVersion.windows}`;
                    openDownloadLink(url);
                  }
                }}
                disabled={loading || currentVersion.windows === '未知版本'}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" /> 最新版本
              </button>
              <button 
                onClick={() => {
                  let url = null;
                  if (pastVersion && pastVersion.Windows) {
                    url = `https://rdd.weao.gg/?channel=LIVE&binaryType=WindowsPlayer&version=${pastVersion.Windows}`;
                  } else if (currentVersion.windows !== '未知版本') {
                    url = `https://rdd.weao.gg/?channel=LIVE&binaryType=WindowsPlayer&version=${currentVersion.windows}`;
                  }
                  if (url) {
                    openDownloadLink(url);
                  }
                }}
                disabled={loading || (currentVersion.windows === '未知版本' && (!pastVersion || !pastVersion.Windows))}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                <AlertCircle className="w-4 h-4" /> 旧版本
              </button>
            </div>
          </div>
        </div>

        {/* Mac Version Card */}
        <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-3 opacity-10">
            <Apple className="w-20 h-20 text-blue-400" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/20">
                MAC
              </span>
              <span className="text-xs text-slate-400">{loading ? '加载中...' : formatDate(currentVersion.macDate)}</span>
            </div>
            
            <div className="font-mono text-lg text-white mb-4 break-all">
              {loading ? (
                <div className="h-7 w-32 bg-white/10 rounded animate-pulse" />
              ) : (
                currentVersion.mac
              )}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  if (currentVersion.mac !== '未知版本') {
                    const url = `https://rdd.weao.gg/?channel=LIVE&binaryType=MacPlayer&version=${currentVersion.mac}`;
                    openDownloadLink(url);
                  }
                }}
                disabled={loading || currentVersion.mac === '未知版本'}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" /> 最新版本
              </button>
              <button 
                onClick={() => {
                  let url = null;
                  if (pastVersion && pastVersion.Mac) {
                    url = `https://rdd.weao.gg/?channel=LIVE&binaryType=MacPlayer&version=${pastVersion.Mac}`;
                  } else if (currentVersion.mac !== '未知版本') {
                    url = `https://rdd.weao.gg/?channel=LIVE&binaryType=MacPlayer&version=${currentVersion.mac}`;
                  }
                  if (url) {
                    openDownloadLink(url);
                  }
                }}
                disabled={loading || (currentVersion.mac === '未知版本' && (!pastVersion || !pastVersion.Mac))}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                <AlertCircle className="w-4 h-4" /> 旧版本
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
