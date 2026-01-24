import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Crosshair, Code, Ghost, Cpu } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "100% 未检测",
    description: "先进的绕过方法确保您在主宰游戏时账号依然安全"
  },
  {
    icon: Zap,
    title: "极速如电",
    description: "优化的 Lua 执行引擎, 零延迟, 性能拉满"
  },
  {
    icon: Crosshair,
    title: "通用自瞄",
    description: "高度可定制的自瞄, 支持静默瞄准, 平滑与预判"
  },
  {
    icon: Ghost,
    title: "ESP 与视觉",
    description: "透视墙壁查看玩家, 物品与目标, 完全可自定义的 ESP"
  },
  {
    icon: Code,
    title: "自动更新",
    description: "脚本在注入时自动获取最新偏移与补丁"
  },
  {
    icon: Cpu,
    title: "密钥系统",
    description: "简单快捷"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">为什么选择灵构?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            由实际游戏玩家开发, 关注性能与安全
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
