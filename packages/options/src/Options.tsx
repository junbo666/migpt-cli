import { Characters } from './Characters'
import _set from 'lodash/set.js'
import _get from 'lodash/get.js'
import { produce } from 'immer'
import { Speaker } from './Speaker'
import { type WholeConfig } from './type'
import { H3 } from '@blueprintjs/core'
import { Ai } from './Ai'
import { Tts } from './Tts'
import _isEmpty from 'lodash/isEmpty.js'
import { Dev } from './Dev'

export function Options(props: {
  config: WholeConfig
  onChange: (config: WholeConfig) => void
}) {
  const { config, onChange } = props

  return (
    <div className={'tw-space-y-6'}>
      <div>
        <H3>人设</H3>
        <Characters
          config={config.config}
          onChange={(characterConfig) => {
            const newState = produce(config, (draft) => {
              const mc = _get(draft, 'config', {})
              Object.assign(mc, characterConfig)
              const result = draft || {}
              _set(result, 'config', mc)
              return result
            })!
            onChange(newState)
          }}
        />
      </div>
      <div>
        <H3>音箱</H3>
        <Speaker
          config={config.config.speaker}
          onChange={(speakerConfig) => {
            const newState = produce(config, (draft) => {
              Object.assign(draft.config.speaker, speakerConfig)
            })
            onChange(newState)
          }}
        />
      </div>
      <div>
        <H3>AI 服务</H3>
        <Ai
          config={config.env}
          onChange={(aiConfig) => {
            const newState = produce(config, (draft) => {
              if (_isEmpty(aiConfig)) return
              Object.assign(draft.env || (draft.env = {}), aiConfig)
            })
            onChange(newState)
          }}
        />
      </div>
      <div>
        <H3>语音服务</H3>
        <Tts
          config={{
            speaker: config.config.speaker,
            env: config.env,
          }}
          onChange={(ttsConfig) => {
            const newState = produce(config, (draft) => {
              if (!_isEmpty(ttsConfig.env)) {
                Object.assign(draft.env || (draft.env = {}), ttsConfig.env)
              }
              Object.assign(draft.config.speaker, ttsConfig.speaker)
            })
            onChange(newState)
          }}
        />
      </div>
      <div>
        <H3>开发人员选项</H3>
        <Dev
          config={config.config.speaker}
          onChange={(newConfig) => {
            const newState = produce(config, (draft) => {
              Object.assign(draft.config.speaker, newConfig)
            })
            onChange(newState)
          }}
        />
      </div>
    </div>
  )
}
