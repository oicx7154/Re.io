import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, AlertTriangle, ShieldCheck, Discord, Globe, ShoppingCart } from 'lucide-react';
import { RobloxVersion } from './RobloxVersion';

interface Injector {
  title: string;
  extype: string;
  detected: boolean;
  free: boolean;
  cost?: string;
  keysystem?: boolean;
  updateStatus: boolean;
  decompiler?: boolean;
  multiInject?: boolean;
  uncPercentage?: string;
  suncPercentage?: string;
  discordlink?: string;
  websitelink?: string;
  purchaselink?: string;
  sunc?: {
    suncScrap: string;
    suncKey: string;
  };
  [key: string]: any;
}

export const Injectors = () => {
  const [loading, setLoading] = useState(true);
  const [injectors, setInjectors] = useState<Injector[]>([]);

  const getInjectorsData = async () => {
    const endpoints = [
      'https://weao.xyz/api/status/exploits',
      'https://whatexpsare.online/api/status/exploits',
      'https://whatexploitsaretra.sh/api/status/exploits',
      'https://weao.gg/api/status/exploits'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter((injector: Injector) => !injector.hidden);
          return { "exploits": filteredData };
        }
      } catch (directError) {
      }
    }
    
    // Try with proxies if direct requests fail
    const proxyServices = [
      'https://api.codetabs.com/v1/proxy?quest=',
      'https://api.allorigins.win/get?url='
    ];
    
    for (const proxyBase of proxyServices) {
      for (const endpoint of endpoints) {
        try {
          let proxyUrl;
          if (proxyBase.includes('allorigins')) {
            proxyUrl = proxyBase + encodeURIComponent(endpoint);
          } else {
            proxyUrl = proxyBase + encodeURIComponent(endpoint);
          }

          const proxyResponse = await fetch(proxyUrl, {
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (proxyResponse.ok) {
            let proxyText = await proxyResponse.text();
            
            if (proxyBase.includes('allorigins')) {
              try {
                const proxyData = JSON.parse(proxyText);
                proxyText = proxyData.contents;
              } catch (e) {
                continue;
              }
            }
            
            if (proxyText.trim().startsWith('[') || proxyText.trim().startsWith('{')) {
              const data = JSON.parse(proxyText);
              const filteredData = data.filter((injector: Injector) => !injector.hidden);
              return { "exploits": filteredData };
            }
          }
        } catch (proxyError) {
        }
      }
    }
    
    return { "exploits": [] };
  };

  const formatDate = (dateString: string) => {
    if (typeof dateString === 'string') {
      const dateMatch = dateString.match(/^(\d{1,2}\/\d{1,2}\/\d{4})/);
      if (dateMatch && dateMatch[1]) {
        return new Date(dateMatch[1]).toLocaleDateString('zh-CN');
      }
    }
    return '未知';
  };

  const updateInjectorsList = async () => {
    setLoading(true);
    try {
      const injectorsData = await getInjectorsData();
      setInjectors(injectorsData.exploits);
    } catch (error) {
      console.error('更新注入器列表失败:', error);
      setInjectors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateInjectorsList();
  }, []);

  const getPlatformText = (extype: string) => {
    switch (extype) {
      case 'wexecutor':
        return 'Windows';
      case 'wexternal':
        return '外部';
      case 'aexecutor':
        return '手机';
      case 'iexecutor':
        return 'iOS';
      case 'mexecutor':
        return 'Mac';
      default:
        return '未知';
    }
  };

  const getUpdateStatusText = (updateStatus: boolean) => {
    return updateStatus ? '已更新' : '未更新';
  };

  const getDetectedText = (detected: boolean) => {
    return detected ? '被检测' : '未被检测';
  };

  return (
    <div>
      <RobloxVersion />
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500 mx-auto mb-4"></div>
            <p className="text-slate-400">加载注入器数据中...</p>
          </div>
        </div>
      ) : injectors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-red-400">无法加载注入器数据，请稍后重试</p>
          <button 
            onClick={updateInjectorsList}
            className="mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white transition-colors"
          >
            重试
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {injectors.map((injector, index) => {
            const extype = injector.extype || injector.extpye;
            const platformText = getPlatformText(extype);
            const updateStatusText = getUpdateStatusText(injector.updateStatus);
            const detectedText = getDetectedText(injector.detected);
            const uncPercent = Math.min(Math.max(parseInt(injector.uncPercentage) || 0, 0), 100);
            const suncPercent = Math.min(Math.max(parseInt(injector.suncPercentage) || 0, 0), 100);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-slate-900/80 border border-white/5 hover:border-violet-500/30 transition-all p-5 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="w-24 h-24 text-white" />
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                      {injector.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${
                      injector.free ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {injector.free ? '免费' : injector.cost || '付费'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded ${
                      injector.detected ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      <ShieldCheck className="w-3 h-3" /> {detectedText}
                    </span>
                    <span className={`flex items-center gap-1 px-2 py-1 rounded ${
                      injector.updateStatus ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      <CheckCircle className="w-3 h-3" /> {updateStatusText}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 text-blue-400 border-blue-500/20">
                      <ExternalLink className="w-3 h-3" /> {platformText}
                    </span>
                    {injector.keysystem && (
                      <span className="flex items-center gap-1 px-2 py-1 rounded bg-purple-500/10 text-purple-400 border-purple-500/20">
                        密钥系统
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-slate-500" />
                      类型: {platformText}
                    </div>
                    {extype !== 'wexternal' && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        UNC: {uncPercent}%
                      </div>
                    )}
                    {extype !== 'wexternal' && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        SUNC: {suncPercent}%
                      </div>
                    )}
                    {injector.decompiler && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        Decompiler
                      </div>
                    )}
                    {injector.multiInject && (
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1 h-1 rounded-full bg-slate-500" />
                        Multi Inject
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  {injector.discordlink && (
                    <a 
                      href={injector.discordlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-medium text-white transition-all"
                    >
                      <Discord className="w-3.5 h-3.5" /> Discord
                    </a>
                  )}
                  {injector.websitelink && (
                    <a 
                      href={injector.websitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-medium text-white transition-all"
                    >
                      <Globe className="w-3.5 h-3.5" /> 官网
                    </a>
                  )}
                  {injector.purchaselink && (
                    <a 
                      href={injector.purchaselink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-medium text-white transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> 购买
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
