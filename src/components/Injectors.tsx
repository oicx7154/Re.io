import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, ShieldCheck, MessageCircle, Globe, ShoppingCart, X } from 'lucide-react';
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

interface SuncData {
  functions: { [key: string]: boolean };
  timeTaken?: number;
  version?: string;
}

export const Injectors = () => {
  const [loading, setLoading] = useState(true);
  const [injectors, setInjectors] = useState<Injector[]>([]);
  const [suncModalOpen, setSuncModalOpen] = useState(false);
  const [suncLoading, setSuncLoading] = useState(false);
  const [suncData, setSuncData] = useState<SuncData | null>(null);
  const [selectedInjector, setSelectedInjector] = useState<{
    name: string;
    suncPercent: number;
    uncPercent: number;
    suncScrap: string;
    suncKey: string;
  } | null>(null);

  const getInjectorsData = async () => {
    const endpoints = [
      'http://farts.fadedis.xyz:25551/api/status/exploits',      
      'https://whatexpsare.online/api/status/exploits',
      'https://whatexploitsaretra.sh/api/status/exploits',
      'https://weao.gg/api/status/exploits'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'WEAO-3PService'
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
              'Accept': 'application/json',
              'User-Agent': 'WEAO-3PService'
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

  const fetchSuncData = async (scrapId: string, suncKey: string) => {
    try {
      const response = await fetch(`https://sunc.rubis.app/api/scrap/${scrapId}&key=${suncKey}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WEAO-3PService'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('获取 SUNC 数据失败:', error);
    }
    return null;
  };

  const groupSuncFunctions = (functions: { [key: string]: boolean }) => {
    const groups: { [key: string]: { [key: string]: boolean } } = {};
    
    Object.entries(functions).forEach(([funcName, passed]) => {
      const groupName = funcName.split('.')[0] || '其他';
      if (!groups[groupName]) {
        groups[groupName] = {};
      }
      groups[groupName][funcName] = passed;
    });
    
    return groups;
  };

  const openSuncModal = async (injectorName: string, suncPercent: number, uncPercent: number, suncScrap: string, suncKey: string) => {
    setSelectedInjector({
      name: injectorName,
      suncPercent,
      uncPercent,
      suncScrap,
      suncKey
    });
    setSuncLoading(true);
    setSuncData(null);
    setSuncModalOpen(true);

    if (suncScrap && suncKey) {
      try {
        const data = await fetchSuncData(suncScrap, suncKey);
        setSuncData(data);
      } catch (error) {
        console.error('加载 SUNC 数据失败:', error);
      } finally {
        setSuncLoading(false);
      }
    } else {
      setSuncLoading(false);
    }
  };

  const closeSuncModal = () => {
    setSuncModalOpen(false);
    setTimeout(() => {
      setSelectedInjector(null);
      setSuncData(null);
    }, 300);
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
            const uncPercent = Math.min(Math.max(parseInt(injector.uncPercentage || '0') || 0, 0), 100);
            const suncPercent = Math.min(Math.max(parseInt(injector.suncPercentage || '0') || 0, 0), 100);

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
                        <button 
                          onClick={() => {
                            if (injector.sunc && injector.sunc.suncScrap && injector.sunc.suncKey) {
                              openSuncModal(
                                injector.title,
                                suncPercent,
                                uncPercent,
                                injector.sunc.suncScrap,
                                injector.sunc.suncKey
                              );
                            }
                          }}
                          className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          SUNC: {suncPercent}%
                        </button>
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
                      <MessageCircle className="w-3.5 h-3.5" /> Discord
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
    
    {/* SUNC Modal */}
    {suncModalOpen && selectedInjector && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/95 border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">
              {selectedInjector.name} - SUNC 测试结果
            </h3>
            <button 
              onClick={closeSuncModal}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            {suncLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500 mb-4"></div>
                <p className="text-slate-400">加载 SUNC 测试结果中...</p>
              </div>
            ) : !suncData ? (
              <div className="text-center py-12">
                <p className="text-slate-400">此注入器没有 SUNC 测试数据</p>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 text-violet-400 rounded-lg border border-violet-500/30">
                    <span className="font-bold">{selectedInjector.suncPercent}%</span>
                    <span>SUNC</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 ml-2">
                    <span className="font-bold">{selectedInjector.uncPercent}%</span>
                    <span>UNC</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <div className="text-2xl font-bold text-violet-400">{Math.round((Object.values(suncData.functions).filter(f => f).length / Object.keys(suncData.functions).length) * 100)}%</div>
                    <div className="text-sm text-slate-400 mt-1">通过百分比</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <div className="text-2xl font-bold text-green-400">{Object.values(suncData.functions).filter(f => f).length}</div>
                    <div className="text-sm text-slate-400 mt-1">通过函数</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <div className="text-2xl font-bold text-red-400">{Object.values(suncData.functions).filter(f => !f).length}</div>
                    <div className="text-sm text-slate-400 mt-1">失败函数</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                    <div className="text-2xl font-bold text-white">{Object.keys(suncData.functions).length}</div>
                    <div className="text-sm text-slate-400 mt-1">总函数数</div>
                  </div>
                </div>
                
                {suncData.timeTaken && (
                  <div className="mb-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30 text-sm text-blue-300">
                    测试耗时: {suncData.timeTaken}ms
                  </div>
                )}
                
                {suncData.version && (
                  <div className="mb-6 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 text-sm text-purple-300">
                    SUNC 版本: {suncData.version}
                  </div>
                )}
                
                <div className="space-y-4">
                  {Object.entries(groupSuncFunctions(suncData.functions)).map(([groupName, functions]) => (
                    <div key={groupName} className="bg-slate-800/50 rounded-lg border border-white/5 overflow-hidden">
                      <div className="px-4 py-3 bg-white/5 border-b border-white/5">
                        <h4 className="font-medium text-white">
                          {groupName} ({Object.keys(functions).length})
                        </h4>
                      </div>
                      <div className="divide-y divide-white/5">
                        {Object.entries(functions).map(([funcName, passed]) => (
                          <div key={funcName} className="px-4 py-2 flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${passed ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-sm text-slate-300">{funcName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/30 text-sm text-amber-300">
              <p className="flex items-start gap-2">
                <span className="font-bold">⚠️</span>
                <span>SUNC 测试结果仅供参考，实际性能可能因环境不同而有所差异。</span>
              </p>
            </div>
          </div>
          
          <div className="p-6 border-t border-white/10 flex justify-between items-center">
            {selectedInjector.suncScrap && selectedInjector.suncKey && (
              <a 
                href={`https://sunc.rubis.app/?scrap=${selectedInjector.suncScrap}&key=${selectedInjector.suncKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium text-white border border-white/5"
              >
                <ExternalLink className="w-4 h-4" />
                在新窗口中查看
              </a>
            )}
            <button 
              onClick={closeSuncModal}
              className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg transition-colors text-violet-400 hover:text-violet-300 text-sm font-medium border border-violet-500/30"
            >
              关闭
            </button>
          </div>
        </motion.div>
      </div>
    )}
  </div>
);
};
